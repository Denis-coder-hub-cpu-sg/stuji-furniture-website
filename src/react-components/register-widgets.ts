import React from 'react';
import reactToWebComponent from 'react-to-webcomponent';
import ReactDOM from 'react-dom/client';
import RecentlyViewed from './RecentlyViewed';

const RecentlyViewedElement = reactToWebComponent(RecentlyViewed, React, ReactDOM as any);

customElements.define('recently-viewed', RecentlyViewedElement);