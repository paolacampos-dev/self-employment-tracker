import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="sign-container">
            <h1 className="wellcome">Start your professional journey!!</h1>
            <SignUp appearance={{
                        variables: {
                            colorPrimary: "#b97a18"
                        }                            
                    }}    
            afterSignOutUrl="/freelancer" />
        </div>
    );
}