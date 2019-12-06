import { configure } from '@storybook/react';
import requireContext from 'require-context.macro'
let req
try {
  // This for Storybook
  req = require.context('../src', true, /\.stories\.tsx$/)
}
catch
{
  //This for storyshots
  req = requireContext('../src', true, /\.stories\.tsx$/)
}

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);