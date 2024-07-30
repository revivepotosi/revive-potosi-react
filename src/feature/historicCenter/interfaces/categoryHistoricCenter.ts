interface Texts {
  name: string;
}

interface CategoryHistoricCenter {
  id: string;
  text: Record<string, Texts>;
}

export default CategoryHistoricCenter;
