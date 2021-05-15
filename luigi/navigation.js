import { getNodes } from './nodes';

export let resolveNavigation;

export let navigation = {
  nodes: new Promise((res) => {
    resolveNavigation = res;
  })
};

export function getNavigationData(userInfo) {
  const nodes = getNodes(userInfo);

  return new Promise(function (resolve, reject) {
    const filteredNodes = nodes.reduce((acc, a) => {
      const ch =
        a.children &&
        a.children.filter((b) => b.constraints.includes(userInfo.role));
      if (ch && ch.length) {
        acc.push({ ...a, children: ch });
      } else if (a.constraints.includes(userInfo.role)) {
        acc.push({ constraints: a.constraints });
      }
      return acc;
    }, []);
    resolve(filteredNodes);
  });
}
