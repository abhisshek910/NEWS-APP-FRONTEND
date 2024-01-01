import React from "react";
import Hero from "./hero";
import Articles from "./Articles";
import Cta from "./Cta";
import { Helmet } from "react-helmet";
export default function Homepage() {
  return (
    <div>
      <Helmet>
        <meta property="description" content="these description"></meta>
        <meta property="og:title" content="Dhhamaka news" />
        <meta property="og:description" content="Latest News" />

        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:site_name" content="Dhhamaka News"></meta>
      </Helmet>
      <Hero />
      <Articles />
      <Cta />
    </div>
  );
}
