import React, {Component} from "react";
import Layout from "../../../Proj/quiz/src/hoc/Layout/Layout";
import Quiz from '../../../Proj/quiz/src/containers/Quiz/Quiz'

class App extends Component {
  render() {
    return (
        <Layout>
          <Quiz />
        </Layout>
    )
  }
}

export default App;
