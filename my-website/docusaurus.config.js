/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: 'Tunnel',
  tagline: 'A simple and reliable way to manage the state of your application',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'LFSCamargo', // Usually your GitHub org/user name.
  projectName: 'tunnel', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Tunnel',
      logo: {
        alt: 'TunnelJS',
        src: 'img/tunnel.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/LFSCamargo/tunnel',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
            {
              label: 'How to use Persistance',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Social Networks',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LFSCamargo',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lXSLuizinho',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/LFSCamargo/tunnel',
            },
          ],
        },
      ],
      logo: {
        alt: 'TunnelJS',
        src: 'img/tunneljs.png',
        href: 'https://github.com/LFSCamargo/tunnel',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} LFSCamargo. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
