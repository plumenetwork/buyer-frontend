export default function DocumentSignin(props: any) {
  return (
    <div>
      Document Signin
      <button onClick={() => props.setTabs(2)}>Continue</button>
    </div>
  );
}
