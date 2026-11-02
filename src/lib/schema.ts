import type { CollectionEntry } from 'astro:content';
import { isoDate, osLabel } from './format';
import { pluginTypeLabel } from './plugin-types';
import { withBase } from './url';

// schema.org descriptions of pages, read by search engines (JSON-LD).

const abs = (path: string, site: URL) => new URL(withBase(path), site).href;

const author = (site: URL) => ({ '@type': 'Person', name: 'Cadenzy', url: abs('about/', site) });

export function websiteSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Editing Lair',
    url: abs('', site),
    description: 'DaVinci Resolve Fusion macros and notes on editing, made by Cadenzy.',
    inLanguage: 'en',
  };
}

export function pluginSchema(plugin: CollectionEntry<'plugins'>, site: URL, image?: string) {
  const d = plugin.data;
  const { access } = d;
  const offer =
    access.kind === 'free'
      ? { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      : {
          '@type': 'Offer',
          url: access.storeUrl,
          price: access.price.replace(/[^\d.]/g, ''),
          ...(access.price.includes('$') && { priceCurrency: 'USD' }),
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: d.title,
    description: d.summary,
    url: abs(`plugins/${plugin.id}/`, site),
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: pluginTypeLabel[d.type],
    operatingSystem: d.compatibility.os.map((o) => osLabel[o]).join(', '),
    softwareVersion: d.version,
    softwareRequirements: `DaVinci Resolve ${d.compatibility.resolve} ${d.compatibility.edition === 'free' ? '(Free or Studio)' : 'Studio'}`,
    datePublished: isoDate(d.released),
    dateModified: isoDate(d.updated ?? d.released),
    ...(image && { image: new URL(image, site).href }),
    ...(access.kind === 'free' && { downloadUrl: access.download, ...(access.fileSize && { fileSize: access.fileSize }) }),
    offers: offer,
    author: author(site),
  };
}

export function noteSchema(post: CollectionEntry<'posts'>, site: URL) {
  const d = post.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.description,
    url: abs(`notes/${post.id}/`, site),
    datePublished: isoDate(d.published),
    dateModified: isoDate(d.updated ?? d.published),
    inLanguage: 'en',
    author: author(site),
  };
}
