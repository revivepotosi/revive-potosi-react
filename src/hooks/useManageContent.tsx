import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Content from '../interfaces/content';
import { getContent } from '../utils/content/getContent';

interface Props {
  id?: string;
  type: string;
  onBack: () => void;
}

const useManageContent = ({ id, type, onBack }: Props) => {
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const init = async () => {
      setContents(await getContent(id ?? '', type));
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      onBack();
    });
  }, []);

  return {
    language,
    loading,
    contents,
  };
};

export default useManageContent;
