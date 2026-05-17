import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

type Props = {
  onSuccess?: (idToken: string) => void;
  onError?: () => void;
};

const GoogleAuthButton: React.FC<Props> = ({ onSuccess, onError }) => {
  const handleSuccess = (res: CredentialResponse) => {
    if (res.credential) {
      onSuccess?.(res.credential);
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg p-1 hover:bg-gray-50 transition">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={onError}
        theme="outline"
        size="large"
        shape="rectangular"
        width={300} 
        text="continue_with"
      />
    </div>
  );
};

export default GoogleAuthButton;