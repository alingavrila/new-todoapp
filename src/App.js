import { Amplify } from "aws-amplify";
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Home from "./components/Home";

Amplify.configure(awsExports)

const App = ({ signOut }) => {
  return <>
    <Home />
    <button onClick={signOut}>Sign out</button>
  </>
}

export default withAuthenticator(App);