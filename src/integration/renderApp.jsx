import React from 'react';
import { render } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import liveRadioPageJson from '#data/korean/bbc_korean_radio/liveradio.json';
import routes from '../app/routes';
// eslint-disable-next-line import/no-named-as-default
import App from '#containers/App/App';

const getByTextSpecial = getByText => text =>
  getByText((content, node) => {
    const hasText = ({ textContent }) => textContent === text;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      child => !hasText(child),
    );

    return nodeHasText && childrenDontHaveText;
  });

export default async _pathname => {
  const pathname = _pathname.replace('https://www.bbc.com', '');
  fetch.mockResponse(JSON.stringify(liveRadioPageJson));

  const { getInitialData } = routes.find(({ path }) =>
    matchPath(pathname, {
      path,
      exact: true,
    }),
  );
  const { pageData } = await getInitialData(pathname);

  const renderResult = render(
    <MemoryRouter initialEntries={[pathname]}>
      <App
        routes={routes}
        initialData={{ pageData, status: 200 }}
        bbcOrigin=""
        history={{}}
      />
    </MemoryRouter>,
  );

  return {
    ...renderResult,
    within: (...args) => {
      const withinResult = within(...args);

      return {
        ...withinResult,
        getByTextSpecial: getByTextSpecial(withinResult.getByText),
      };
    },
    getByTextSpecial: getByTextSpecial(renderResult.getByText),
  };
};
