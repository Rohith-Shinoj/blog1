import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'

const MAX_DISPLAY = 10

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <section className="space-y-2 pt-1 pb-4 md:space-y-5">
          <div className="space-y-4">
            <h1 className="text-lg leading-7 font-bold tracking-tight text-gray-900 sm:text-xl sm:leading-10 md:text-2xl md:leading-14 dark:text-gray-100">
              Welcome to DeeperThoughts – A blog that bridges the gap between code and cognition.
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-300">
              I'm Rohith Shinoj Kumar, a Research Engineer at the Centre for Development of
              Telematics (C-DOT), and a deep learning enthusiast with a passion for peeling back the
              layers of multimodal machine learning systems. In a world of high-level abstractions,
              I'm driven by a desire to understand the why behind models — connecting theory to
              implementation.
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300">
              This blog is intended to make recent advances easier to grasp, and is an open
              invitation to think deeper, explore further, and stay curious about the evolving
              landscapes of AI.
            </p>
            <div className="mt-0 flex flex-col items-center justify-center gap-4 md:flex-row">
              <a
                className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-700 hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"
                href="https://www.rohithshinoj.com"
                target="_blank"
              >
                Visit Portfolio
              </a>
              <a
                href="#newsletter"
                className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-700 hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>
        </section>
        <section aria-labelledby="latest-posts-heading">
          <h2 id="latest-posts-heading" className="sr-only">
            Latest Blog Posts
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags, thumbnail } = post
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                        {/* Thumbnail image under the date, from frontmatter */}
                        {thumbnail && (
                          <div className="mt-4 mb-2">
                            <Image
                              src={thumbnail}
                              alt={title}
                              width={320}
                              height={180}
                              className="h-50 w-50 rounded-lg border border-gray-700 object-cover"
                              priority={false}
                            />
                          </div>
                        )}
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <section aria-labelledby="newsletter">
          <h2 id="newsletter" className="sr-only">
            Newsletter Subscription
          </h2>
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        </section>
      )}
    </>
  )
}
