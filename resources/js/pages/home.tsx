import PublicLayout from '@/layouts/public-layout';

interface HomeProps {
    // Data will come from controller
}

export default function Home({}: HomeProps) {
    return (
        <PublicLayout title="Home">
            <div className="space-y-12">
                {/* About Me Section */}
                <section className="bg-portfolio-color1 rounded-lg p-8 shadow-lg">
                    <h1 className="text-4xl mb-6 text-portfolio-text">About Me</h1>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-portfolio-text">
                            Welcome to my portfolio! I'm an IT professional with experience in 
                            software development, system administration, and technology consulting.
                        </p>
                        <p className="text-portfolio-text mt-4">
                            I'm passionate about creating efficient solutions and staying up-to-date 
                            with the latest technologies in the industry.
                        </p>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="bg-portfolio-color2 rounded-lg p-8 shadow-lg">
                    <h2 className="text-3xl mb-6 text-portfolio-text">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Skills will be passed as props from controller */}
                        {['Laravel', 'React', 'PHP', 'JavaScript', 'MySQL', 'Tailwind CSS'].map((skill) => (
                            <div
                                key={skill}
                                className="bg-portfolio-bg rounded-md p-4 text-center text-portfolio-text border border-portfolio-color1 font-gothica"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="bg-portfolio-color1 rounded-lg p-8 shadow-lg">
                    <h2 className="text-3xl mb-6 text-portfolio-text">Experience</h2>
                    <div className="space-y-6">
                        {/* Experience items will be passed as props from controller */}
                        <div className="bg-portfolio-bg rounded-md p-6 border-l-4 border-portfolio-color2">
                            <h3 className="text-xl text-portfolio-text mb-2">Senior IT Specialist</h3>
                            <p className="text-portfolio-color2 mb-2">Company Name | 2020 - Present</p>
                            <p className="text-portfolio-text">
                                Responsible for developing and maintaining web applications, 
                                managing server infrastructure, and providing technical support.
                            </p>
                        </div>
                        <div className="bg-portfolio-bg rounded-md p-6 border-l-4 border-portfolio-color2">
                            <h3 className="text-xl text-portfolio-text mb-2">Software Developer</h3>
                            <p className="text-portfolio-color2 mb-2">Previous Company | 2018 - 2020</p>
                            <p className="text-portfolio-text">
                                Developed and maintained multiple web applications using Laravel and React.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}