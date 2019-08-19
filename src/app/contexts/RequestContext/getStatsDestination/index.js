const getStatsDestination = ({ isUK = true, env = 'test', service }) => {
  let destination = '';

  if (service === 'news') {
    destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
  } else if (service === 'cymrufyw' || service === 'naidheachdan') {
    destination = isUK !== false ? 'NEWS_LANGUAGES_PS' : 'NEWS_LANGUAGES_GNL';
  } else if (service === 'japanese') {
    destination = 'NEWS_LANGUAGES_GNL';
  } else {
    destination = 'WS_NEWS_LANGUAGES';
  }
  return env === 'live' ? destination : `${destination}_TEST`;
};

export default getStatsDestination;
