import React from 'react';
import { Typography } from '@material-ui/core';

const Description = () => (
  <>
    <Typography variant="h6">
      What is the Tech Radar?
    </Typography>

    <Typography variant="subtitle2">
      This tool shows my skills and directions in which I intend to develop. Based on the <a href="https://www.thoughtworks.com/radar">pioneering
      work of ThoughtWorks</a> and <a href="https://github.com/zalando/tech-radar">Zalando&#39;s project</a>.
    </Typography>
    <Typography variant="subtitle2">
      The Tech Radar is a list of technologies, methodologies,  complemented by an assessment result, called <em>ring
        assignment</em>. I use four rings with the following semantics:
    </Typography>


    <ul>
      <li>
        <Typography variant="body2">
          <strong>ADOPT</strong> &mdash; Used in production environment, low risk and recommended to
          be widely used.
          </Typography>
      </li>

      <li>
        <Typography variant="body2">
          <strong>TRIAL</strong> &mdash; Technologies that I started to use, solve a
          real problem; TRIAL technologies are slightly more risky
          </Typography>
      </li>

      <li>
        <Typography variant="body2">
          <strong>ASSESS</strong> &mdash; Technologies that are promising and have clear potential value-add for me;
          I read, learn and monitor such technolologies. Sometimes i started a prototyping effort.
          ASSESS technologies have higher risks.
          </Typography>
      </li>

      <li>
        <Typography variant="body2">
          <strong>HOLD</strong> &mdash; This does not always mean that technology is bad, it just means
          that it is not in my interest. HOLD technologies should not be used for new projects,
          but usually can be continued for existing projects.
          </Typography>
      </li>
    </ul>

    <Typography align="center">
      &copy; 2020 Grzegorz Marchwiński
    </Typography>
  </>
)

export default Description;
