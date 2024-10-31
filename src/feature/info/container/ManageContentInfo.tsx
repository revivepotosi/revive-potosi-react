import ManageContent from '../../../components/manageContent/ManageContent';
import collections from '../../../constants/collections';
import useManageContentInfo from '../hooks/useManageContentInfo';

const ManageContentInfo = () => {
  const {
    onBack,
    onAddContent,
  } = useManageContentInfo();
  return (
    <ManageContent type={collections.info} onBack={onBack} onAddContent={onAddContent} />
  );
};

export default ManageContentInfo;
