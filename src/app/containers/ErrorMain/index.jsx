import React from 'react';
import { number } from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { GEL_PARAGON } from '@bbc/gel-foundations/typography';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { Wrapper, GridItemConstrained } from '../../lib/styledGrid';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

const StatusCode = styled.p`
  ${GEL_PARAGON}
  color: ${C_POSTBOX};
  display: block;
  font-family: ${FF_NEWS_SANS_REG};
  font-weight: bold;
  margin-bottom: 0;
`;

const ShortHeadline = styled(Headline)`
  padding: 1rem 0 3rem 0;
`;

const LongGridItemConstrained = styled(GridItemConstrained)`
  padding-bottom: 4rem;
`;

const ListItem = Paragraph.withComponent('li');

const ErrorMain = ({ status }) => (
  <ServiceContextConsumer>
    {({ translations }) => {
      const messaging = translations.error[status] || translations.error[500];

      return (
        <main role="main">
          <Wrapper>
            <LongGridItemConstrained>
              <StatusCode aria-hidden="true">{messaging.statusCode}</StatusCode>
              <ShortHeadline
                aria-label={`${messaging.statusCode} - ${messaging.title}`}
              >
                {messaging.title}
              </ShortHeadline>
              <Paragraph>{messaging.message}</Paragraph>
              <ul>
                {messaging.solutions.map(text => (
                  <ListItem key={nanoid()}>{text}</ListItem>
                ))}
              </ul>
              <Paragraph>
                {messaging.callToActionFirst}
                <InlineLink href={messaging.callToActionLinkUrl}>
                  {messaging.callToActionLinkText}
                </InlineLink>
                {messaging.callToActionLast}
              </Paragraph>
            </LongGridItemConstrained>
          </Wrapper>
        </main>
      );
    }}
  </ServiceContextConsumer>
);

ErrorMain.propTypes = {
  status: number.isRequired,
};

export default ErrorMain;
