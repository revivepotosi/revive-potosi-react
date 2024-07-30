import Info from '../interface/info';

const hasInfoContent = (infos: Info[]) => {
  if (!(Boolean(infos) && Array.isArray(infos) && infos.length > 0)) return false;
  const infoContents = infos[0].contents;
  if (!(Boolean(infoContents) && Array.isArray(infoContents) && infoContents.length > 0))
    return false;
  return true;
};

export { hasInfoContent };
