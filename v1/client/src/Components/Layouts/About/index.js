import React from "react";
import {
  Container,
  Speaker,
  Quote,
  Block,
  Blockquote,
  Li,
  Ul,
  Question,
  About,
  Mission,
  Paragraph,
  P,
  Summury,
  Headers,
  H2,
  H3,
} from "./StyledComponents";

const AboutUs = () => (
  <Container>
    <Headers />
    <Summury>
      <H2>Connect5</H2>
      <P>
        Connect 5 has been developed to give frontline staff the confidence to
        have more effective conversations with the public about their mental
        health and wellbeing
      </P>
    </Summury>
    <Mission>
      <H3>-Our Mission-</H3>
      <P>
        To provides participants with skills and competencies that build
        confidence in having conversations about mental health and wellbeing in
        their routine practice.
      </P>
    </Mission>
    <About>
      <H3>About</H3>
      <Question>
        <h3>What is Connect 5?</h3>
        <Paragraph>
          Connect 5 is focused on training staff to enable them to support their
          patients or clients to live well mentally, to better manage their
          mental health, increase their resilience and ultimately improve
          wellbeing.
        </Paragraph>
        <Paragraph>
          The techniques used by Connect 5 are underpinned by the Five Ways to
          Wellbeing and a cognitive behavioural model for understanding stress,
          distress and learning tools for self-management.
        </Paragraph>
        <Paragraph>
          Connect 5 training is tailored to the needs of your staff – and can
          take place for between a half-day and two and a half days depending on
          who it is for and how much support they can provide.
        </Paragraph>
      </Question>
      <Question>
        <h3>Why has it been developed?</h3>
        <Paragraph>
          With mental health emerging as a pressing priority, and services
          struggling to cope with the burden, promoting self-management is at
          the heart of current health and social care policy.
        </Paragraph>
        <Paragraph>
          There are currently many obstacles preventing people from accessing
          the help they need with mental health issues. Stigma associated with
          mental health means that those not working in mental health often
          don’t feel skilled or confident enough to speak about mental health
          issues.
        </Paragraph>
        <Paragraph>
          Connect 5 has been developed to help address these problems by
          releasing some of the core knowledge and skills held by specialist
          mental health services into the wider health and care workforce,
          enabling people to feel confident having conversations around health
          and wellbeing, and make more effective referrals in to mental health
          services.
        </Paragraph>
      </Question>
      <Question>
        <h3>
          How does Connect 5 fit with national health and care priorities?
        </h3>
        <Ul>
          <Li>
            Builds capacity and capability to support prevention and reduce
            demand, supporting the Five Year Forward View (FYFV) and
            specifically the FYFV for Mental Health workforce strategy.
          </Li>
          <Li>
            Delivers brief interventions for mental wellbeing as part of Making
            Every Contact Count (MECC), as agreed in the MECC national consensus
            statement.
          </Li>
          <Li>
            Promotes a self-care and self-management approach and increases
            mental health literacy.
          </Li>
          <Li>
            Champions the public’s health, wellbeing, independence and control,
            supporting the Care Act and Public Health priorities.
          </Li>
          <Li>
            Develops the role of the ‘wider workforce’ to embed prevention and
            public health across a broader system, in line with the Fit for the
            Future Public Health strategy and the Public
          </Li>
          <Li>Mental Health Leadership and Workforce Development Framework</Li>
        </Ul>
      </Question>
    </About>
    <Blockquote>
      <H3>What did people say about us?</H3>
      <Block>
        <Quote>
          Connect 5 helps to support the aspirations outlined in the PHE
          Prevention Concordat by facilitating universal responsibility for
          prevention and the promotion of mental wellbeing. It is applicable
          across the whole of the public sector workforce, employers and
          community groups everywhere.
        </Quote>
        <Speaker>
          Julie Daneshyar, Health and Wellbeing Programme Manager, Public Health
          England
        </Speaker>
      </Block>
    </Blockquote>
  </Container>
);

export default AboutUs;
