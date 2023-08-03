function About() {
  return (
    <div className="about mt-1 py-12 md:mt-4">
      <div className="container max-w-3xl px-6 md:px-0">
        <h1 className="md:text-xlg font-body text-2xl  text-gray-700 md:leading-normal">
          Welcome to my all-in-one ecommerce website and blog
        </h1>
        <div className="about-text leading-relaxed">
          <p>
            Built with cutting-edge technologies such as React.js, Redux,
            Tailwind, and Strapi for CMS, this fully responsive website
            showcases my web design, development skills, and experience. With a
            range of products and payment options, the ecommerce section of the
            website is fully functional and ready for customers to shop.
          </p>
          <p>
            In addition to the ecommerce functionality, the website also
            features a blog section where I share my insights and knowledge on
            web development and industry trends. This blog section not only
            demonstrates my passion for the field, but also showcases my ability
            to create engaging content and keep up with the latest developments.
          </p>
          <p>
            If you're an employer looking for a frontend developer with a broad
            range of skills and experience, look no further than my ecommerce
            website and blog. Explore the site today to see my skills in action
            and learn more about what I can bring to your team.
          </p>
        </div>
        <h1 className="md:text-xlg mt-14 font-body text-2xl  text-gray-700 md:leading-normal">
          About Me
        </h1>
        <div className="about-text leading-relaxed">
          <p>
            For an in-depth look at the code behind this website, you can find
            it on my{" "}
            <a
              className="font-bold text-primary-500 hover:underline "
              href="https://github.com/vancrow161989/crow-shop-"
              target="_blank">
              GitHub account here
            </a>
            . Additionally, I have another impressive sample project utilizing
            the rawg.io API, which you can experience by visiting{" "}
            <a
              className="font-bold text-primary-500 hover:underline"
              href="https://gameverse-ten.vercel.app/"
              target="_blank">
              Gameverse
            </a>
            . Don't forget to check out the corresponding GitHub repository by
            clicking{" "}
            <a
              className="font-bold text-primary-500 hover:underline"
              href="https://github.com/vancrow161989/gameverse"
              target="_blank">
              here
            </a>
            .
          </p>
          <p>
            These are just a few of my sample personal projects, and I am
            dedicated to enhancing them further while continuously expanding my
            knowledge in line with my work. Expect even more high-quality
            projects to come as I strive to deliver exceptional results.
          </p>
          <p>
            With each endeavor, I am committed to honing my skills and pushing
            the boundaries of what I can achieve. Join me on this journey of
            growth and innovation as I create captivating experiences and take
            my frontend development expertise to new heights.
          </p>
        </div>
        <h3 className="mt-10 font-bold">- Michael Ivan</h3>
      </div>
    </div>
  );
}

export default About;
