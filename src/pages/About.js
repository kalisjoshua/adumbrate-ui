import {h} from "preact";

import Layout from "../components/Layout"

function About () {

  return (
    <Layout>
      <p>Work breakdown can be a messy activity; rigid structure is the enemy
        during the process as it is highly fluid and dynamic.</p>


      <h2>Planning</h2>

      <p>Adumbrate allows for brainstorming-like flexibility when identifying
        hierarchies of work milestones. Add simple titles for quick recognition,
        then add descriptions to more fully explain details or add notes that
        are important to remember later.</p>

      <p>Start with high-level concepts that are well-known expectations or
        deliverables. Then break down the smaller pieces that will be required
        to accomplish the higher-level items. Rinse and repeat; break concepts
        down to a level where everyone is comfortable with taking on the work
        and completing it at any level given the detail provided.</p>


      <h2>Working</h2>

      <p>The items (leaf-nodes) in the "tree", with no children, are the tasks
        that team members can tackle directly due to not having any dependent
        work.</p>


      <h2>Retrospective</h2>

      <p>Often times, the plan we start out with is not the exact work that gets
        completed due to learning or changing priorities along the way; having a
        "before" and "after" view of the plan can offer interesting insight into
        how we plan new work.</p>
    </Layout>
  )
}

export default About
