import { createGlobalStyle } from 'styled-components';

import DFBSansCondensedWebBold from './DFBSansCondensedWeb-Bold.woff';
import DFBSansCondensedWebBold2 from './DFBSansCondensedWeb-Bold.woff2';
import DFBSansCondensedWebRegular from './DFBSansCondensedWeb-Regular.woff';
import DFBSansCondensedWebRegular2 from './DFBSansCondensedWeb-Regular.woff2';
import DFBSansWebBold from './DFBSansWeb-Bold.woff';
import DFBSansWebBold2 from './DFBSansWeb-Bold.woff2';
import DFBSansWebBoldItalic from './DFBSansWeb-BoldItalic.woff';
import DFBSansWebBoldItalic2 from './DFBSansWeb-BoldItalic.woff2';
import DFBSansWebRegular from './DFBSansWeb-Regular.woff';
import DFBSansWebRegular2 from './DFBSansWeb-Regular.woff2';
import DFBSansWebRegularItalic from './DFBSansWeb-RegularItalic.woff';
import DFBSansWebRegularItalic2 from './DFBSansWeb-RegularItalic.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'DFBSansCondensedWebBold';
        src: local('DFBSansCondensedWebBold'), local('DFBSansCondensedWebBold'),
        url(${DFBSansCondensedWebBold}) format('woff'),
        url(${DFBSansCondensedWebBold2}) format('woff2');
        font-weight: 500;
        font-style: bold;
    }

    @font-face {
        font-family: 'DFBSansCondensedWebRegular';
        src: local('DFBSansCondensedWebRegular'), local('DFBSansCondensedWebRegular'),
        url(${DFBSansCondensedWebRegular}) format('woff'),
        url(${DFBSansCondensedWebRegular2}) format('woff2');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'DFBSansWebBold';
        src: local('DFBSansWebBold'), local('DFBSansWebBold'),
        url(${DFBSansWebBold}) format('woff'),
        url(${DFBSansWebBold2}) format('woff2');
        font-weight: 700;
        font-style: bold;
    }

    @font-face {
        font-family: 'DFBSansWebBoldItalic';
        src: local('DFBSansWebBoldItalic'), local('DFBSansWebBoldItalic'),
        url(${DFBSansWebBoldItalic}) format('woff'),
        url(${DFBSansWebBoldItalic2}) format('woff2');
        font-weight: 500;
        font-style: bold;
    }

    @font-face {
        font-family: 'DFBSansWebRegular';
        src: local('DFBSansWebRegular'), local('DFBSansWebRegular'),
        url(${DFBSansWebRegular}) format('woff'),
        url(${DFBSansWebRegular2}) format('woff2');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'DFBSansWebRegularItalic';
        src: local('DFBSansWebRegularItalic'), local('DFBSansWebRegularItalic'),
        url(${DFBSansWebRegularItalic}) format('woff'),
        url(${DFBSansWebRegularItalic2}) format('woff2');
        font-weight: 300;
        font-style: italic;
    }

`;
