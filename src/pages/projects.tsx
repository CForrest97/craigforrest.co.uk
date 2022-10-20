import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Hero } from "../components/Hero";
import { ProjectCard } from "../components/ProjectCard";

const Projects: NextPage = () => (
  <>
    <Head>
      <title>Projects | Craig Forrest</title>
    </Head>
    <Hero
      title="Projects 📚"
      description="A selection of personal projects I've worked on, during my career as a software
      developer."
    />
    <section className="mt-16">
      <ProjectCard
        title="Reunite"
        description="Over 40,000 people are currently separated from their families by natural disasters, with that number rising every year.
        Charities such as the Red Cross are trying to reunite families."
        href="https://github.com/project-reunite/reunite"
        imageSrc="https://camo.githubusercontent.com/dbba20f74d16a4eb37cc56b0984f6f7923a9873d071fb569ec13214a727ea953/68747470733a2f2f6d656469612e6769746875622e69626d2e636f6d2f757365722f3138363230372f66696c65732f30623931636530302d623230622d313165392d396566662d303561396366646133643530"
      />
      <ProjectCard
        title="Face the Music"
        description="Face The Music is a video game that uses music to teach players about climate change on Earth. Our game brings NASA Earth data to a wider audience, helping raise awareness for one of the most important issues of our time."
        href="https://github.com/Team-ARC/face-the-music"
        imageSrc="https://camo.githubusercontent.com/dbba20f74d16a4eb37cc56b0984f6f7923a9873d071fb569ec13214a727ea953/68747470733a2f2f6d656469612e6769746875622e69626d2e636f6d2f757365722f3138363230372f66696c65732f30623931636530302d623230622d313165392d396566662d303561396366646133643530"
      />
      <ProjectCard
        title="Hitchhiker's Guide to the Internet"
        description="Helping people spot misinformation on the internet, using IBM's Watson Natural Language Understanding"
        href="https://github.com/james-wallis/hitchhikers"
        imageSrc="https://camo.githubusercontent.com/dbba20f74d16a4eb37cc56b0984f6f7923a9873d071fb569ec13214a727ea953/68747470733a2f2f6d656469612e6769746875622e69626d2e636f6d2f757365722f3138363230372f66696c65732f30623931636530302d623230622d313165392d396566662d303561396366646133643530"
      />
      <ProjectCard
        title="Rocket League Tracker"
        description="After using existing trackers to monitor my progress in the game Rocket League I noticed some room for improvement with a more streamlined version."
        href="https://rlt.craigforrest.co.uk"
        imageSrc="https://camo.githubusercontent.com/dbba20f74d16a4eb37cc56b0984f6f7923a9873d071fb569ec13214a727ea953/68747470733a2f2f6d656469612e6769746875622e69626d2e636f6d2f757365722f3138363230372f66696c65732f30623931636530302d623230622d313165392d396566662d303561396366646133643530"
      />
    </section>
  </>
);

export default Projects;
