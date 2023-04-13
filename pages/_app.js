/* _app.js : application의 모든 페이지를 감싸는 최상위 React 컴포넌트
* to keep state when navigating between pages
* to add global styles
*  */

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
