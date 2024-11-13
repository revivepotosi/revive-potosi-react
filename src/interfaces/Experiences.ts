import FileFirebase from './fileFirebase';

interface Texts {
  name: string;
  description: string;
}

interface Experience {
  id?: string;
  historicCenterID: string;
  text: Record<string, Texts>;
  activator: FileFirebase;
  model: FileFirebase;
}

export default Experience;
