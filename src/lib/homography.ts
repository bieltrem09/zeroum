/**
 * Homografia: matriz CSS `matrix3d` que leva um retângulo (0,0)-(w,h) para um quadrilátero
 * qualquer (tl, tr, br, bl). Usada para "encaixar" HTML na tela inclinada do mockup do celular.
 */
type P = [number, number];

function solve(A: number[][], b: number[]) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

export function rectToQuad(w: number, h: number, [tl, tr, br, bl]: [P, P, P, P]) {
  const src: P[] = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const dst = [tl, tr, br, bl];
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  const [a, bb, c, d, e, f, g, hh] = solve(A, b);
  // matrix3d em ordem de coluna
  return `matrix3d(${[a, d, 0, g, bb, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1].map((n) => +n.toFixed(10)).join(",")})`;
}

/** Afasta os cantos do centro (para o conteúdo passar por baixo da borda arredondada do aparelho). */
export function growQuad(q: [P, P, P, P], amount: number): [P, P, P, P] {
  const cx = q.reduce((s, p) => s + p[0], 0) / 4;
  const cy = q.reduce((s, p) => s + p[1], 0) / 4;
  return q.map(([x, y]) => [cx + (x - cx) * (1 + amount), cy + (y - cy) * (1 + amount)]) as [P, P, P, P];
}
