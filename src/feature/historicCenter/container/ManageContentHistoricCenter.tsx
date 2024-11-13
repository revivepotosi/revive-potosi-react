import ManageContent from '../../../components/manageContent/ManageContent';
import useManageContentHistoricCenter from '../hooks/useManageContentHistoricCenter';

const ManageContentHistoricCenter = () => {
  const {
    id,
    onBack,
    onAddContent,
  } = useManageContentHistoricCenter();
  return (
    <ManageContent id={id} onBack={onBack} onAddContent={onAddContent} />
  );
};

export default ManageContentHistoricCenter;
