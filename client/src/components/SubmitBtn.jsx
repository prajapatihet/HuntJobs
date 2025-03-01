import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ formBtn, text, load }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? `${load}` : `${text}`}
    </button>
  );
};
export default SubmitBtn;
