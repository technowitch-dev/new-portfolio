import PublicLayout from '@/layouts/public-layout';

interface HomeProps {
    // Data will come from controller
}

export default function Home({}: HomeProps) {
    return (
        <PublicLayout title="Home">
            <div className="space-y-12">
                <section className="bg-portfolio-bg p-8">
                    <h1 className="text-5xl mb-2 text-portfolio-text">technowitch</h1>
                    <div className="prose prose-lg max-w-none">
                         <span className="font-serif text-portfolio-text">/ˈtɛk.noʊ.wɪtʃ/ <i>noun</i> (plural: technocoven)</span>
                        <p className="text-portfolio-text mt-2 text-lg">
                            <strong>A person who demonstrates an uncanny, seemingly supernatural ability to make technology function as desired, often without needing to possess a full technical understanding of the underlying systems.</strong>
                            <br/>
                            Characterized by intuitive problem solving, inexplicable luck with malfunctioning hardware or software, and an instinctive sense for “what button to press” to resolve issues.
                        </p>
                        <p className="text-portfolio-text mt-4 text-lg">
                            <strong>Examples:</strong>
                            <br/>
                            <i>"As soon as the office technowitch was summoned, the printer started working again."</i>
                            <br/>
                            <i>"I already tried restarting the computer, but the technowitch did it again and it worked."</i>
                            <br/>
                            <i>"I summoned the technowitch to review my erroring code and she found the issue in seconds."</i></p>
                    </div>
                </section>
                {/* About Me Section */}
                <section className="bg-portfolio-color1 rounded-lg p-8 shadow-lg">
                    <h1 className="text-4xl mb-6 text-portfolio-text">About Me</h1>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-portfolio-text">
                        Hi! My name is Skye, a self-proclaimed technowitch
                        </p>
                        <p className="text-portfolio-text mt-4">
                        I am a Computer Science graduate from the University of Wollongong with a specialisation in Cybersecurity, I bring my unique blend of technical knowledge, imaginative thinking, and practical experience to the field. I am currently working as an IT Officer at Real Life Community Group, where I develop my skills and apply my knowledge to whatever novel challenge I am presented with.
                        </p>
                        <p className="text-portfolio-text mt-4">
                        Beyond the digital realm, I like to maintain a balanced lifestyle through sports, social and creative pursuits. I like to stay active through touch football and fitness kickboxing, while my hobbies include Magic: The Gathering, immersing myself in a diverse array of books, and expressing my creativity through painting minifigures. I really enjoy engaging in topics from a philosophical perspective and love to learn. I try to treat every conversation I have as an opportunity to learn something new.
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