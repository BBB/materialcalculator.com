import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import { decycle, } from 'json-cycle';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-gb">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../containers/App/App.scss')._style}}/> : null }
          <style>
            {`
            .Resizer {
              background: #000;
              opacity: .2;
              z-index: 1;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              -moz-background-clip: padding;
              -webkit-background-clip: padding;
              background-clip: padding-box;
            }

            .Resizer:hover {
              -webkit-transition: all 2s ease;
              transition: all 2s ease;
            }

            .Resizer.vertical {
                width: 11px;
                margin: 0 -5px;
                border-left: 5px solid rgba(255, 255, 255, 0);
                border-right: 5px solid rgba(255, 255, 255, 0);
                cursor: col-resize;
            }

            .Resizer.vertical:hover {
                border-left: 5px solid rgba(0, 0, 0, 0.5);
                border-right: 5px solid rgba(0, 0, 0, 0.5);
            }
            .Resizer.disabled {
              cursor: not-allowed;
            }
            .Resizer.disabled:hover {
              border-color: transparent;
            }
            `}
          </style>
        </head>
        <body>
          <div id="content" style={{ height: '100%' }} dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(decycle(store.getState()))};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
