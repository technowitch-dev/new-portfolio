import PublicLayout from '@/layouts/public-layout';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'

interface HomeProps {
    // Data will come from controller
}

const skills = [
    {name: 'Laravel', description: 'Developed and implemented a range of web applications using the Laravel framework (including this website!).'},
    {name: 'Power Automate', description: 'Created and maintained a wide range of automated processes involving other Microsoft 365 services and external APIs.'},
    {name: 'PHP', description: 'Developed and implemented a range of web applications using the PHP programming language.'},
    {name: 'Microsoft Office Suite', description: 'Used Microsoft Office for a range of tasks and processes including email, document writing, spreadsheets and presentations.'},
    {name: 'Microsoft 365 Administration', description: 'Administered and managed Microsoft 365 services, users and infrastructure.'},
    {name: 'Confidentiality', description: 'Uses confidentiality best practices to ensure the security of sensitive client and organisational information.'},
    {name: 'Leadership', description: 'Former unit leader of Rovers and Venturing Scout groups. Experience in small team leadership and collaboration.'},
    {name: 'Disability and Mental Health', description: 'Experience working with individuals with disabilities and mental health conditions in clinical and non-clinical settings.'},
    {name: '🏳️‍🌈 LGBTQIA+ Advocacy 🏳️‍⚧️', description: 'Experience peer mentoring and advocating for LGBTQIA+ individuals to help them find the support and services they need.'},
    {name: 'Volunteering', description: 'Volunteered for many organisations and events including: Supanova 2019-2020, Illawarra Intrepid Landcare, Scouts Australia and other community events.'},
    {name: 'AI Technologies', description: 'Used and developed workflows with a variety of AI technologies including: ChatGPT, Cursor, Copilot, and other custom AI models.'}
]

export default function Home({}: HomeProps) {
    return (
        <PublicLayout title="Home">
            <div className="space-y-12">
                <section className="bg-portfolio-bg p-4 sm:p-6 lg:p-8 z-0 static">
                    <h1 id="technowitch-definition" className="text-3xl sm:text-4xl lg:text-5xl mb-2 text-portfolio-text z-2 relative">technowitch</h1>
                    <div className="prose max-w-none sm:prose-lg z-2 relative">
                         <span aria-labelledby="technowitch-definition" className="font-serif text-portfolio-text">/ˈtɛk.noʊ.wɪtʃ/ <i>noun</i> (plural: technocoven)</span>
                        <p aria-labelledby="technowitch-definition" className="text-portfolio-text mt-2 text-lg">
                            <strong>A person who demonstrates an uncanny, seemingly supernatural ability to make technology function as desired, often without needing to possess a full technical understanding of the underlying systems.</strong>
                            <br/>
                            Characterized by intuitive problem solving, inexplicable luck with malfunctioning hardware or software, and an instinctive sense for “what button to press” to resolve issues.
                        </p>
                        <p aria-labelledby="technowitch-definition" className="text-portfolio-text mt-4 text-lg">
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
                <section className="bg-portfolio-color1 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
                    <h2 id="about-me-section" className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-portfolio-text">About Me</h2>
                    <div className="prose max-w-none sm:prose-lg">
                        <p aria-labelledby="about-me-section" className="text-portfolio-text">
                        Hi! My name is Skye, a self-proclaimed technowitch
                        </p>
                        <p aria-labelledby="about-me-section" className="text-portfolio-text mt-4">
                        I am a Computer Science graduate from the University of Wollongong with a specialisation in Cybersecurity, I bring my unique blend of technical knowledge, imaginative thinking, and practical experience to the field. I am currently working as an IT Officer at Real Life Community Group, where I develop my skills and apply my knowledge to whatever novel challenge I am presented with each day.
                        </p>
                        <p aria-labelledby="about-me-section" className="text-portfolio-text mt-4">
                        Beyond the digital realm, I like to maintain a balanced lifestyle through sports, social and creative pursuits. I like to stay active through touch football and fitness kickboxing, while my hobbies include Magic: The Gathering, reading a diverse array of books, and motorcycle riding. I really enjoy engaging in topics from a philosophical perspective and love to learn. I try to treat every conversation I have as an opportunity to learn something new.
                        </p>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="bg-portfolio-color2 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
                    <h2 id="skills-section" className="text-2xl sm:text-3xl mb-6 text-portfolio-text">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Skills will be passed as props from controller */}
                        {skills.map((skill) => (
                            <Tooltip key={skill.name}>
                            <TooltipTrigger asChild>
                                <button
                                    aria-labelledby="skills-section"
                                    className="bg-portfolio-bg rounded-md p-4 min-h-[44px] text-center text-portfolio-text border border-portfolio-color1 font-gothica cursor-default"
                                >
                                    {skill.name}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {skill.description}
                            </TooltipContent>
                        </Tooltip>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="bg-portfolio-color1 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
                    <h2 id="relevant-experience-section" className="text-2xl sm:text-3xl mb-6 text-portfolio-text">Relevant Experience</h2>
                    <div className="space-y-6">
                        <div className="bg-portfolio-bg rounded-md p-4 sm:p-6 border-l-4 border-portfolio-color2">
                            <h3 id="it-officer-experience" aria-labelledby="relevant-experience-section" className="text-xl text-portfolio-text mb-2">IT Officer</h3>
                            <p aria-labelledby="it-officer-experience" className="text-portfolio-color2 mb-2">Real Life Community Group | April 2023 - Present</p>
                            <p aria-labelledby="it-officer-experience" className="text-portfolio-text">
                                <strong>Worked in a small IT team for an organisation of 300 staff and 1000+ clients performing a range of roles from technical support to project management.</strong><br/><br/>
                                - Provided technical support to the community group's clients and staff.<br/>
                                - Developed and improved IT systems and services across all departments.<br/>
                                - Maintained, ordered, and provisioned IT equipment and infrastructure.<br/>
                                - Wrote and maintained policies and procedures regarding IT usage and security.<br/>
                                - Worked independently to address various IT issues and requests.<br/>
                                - Conducted IT training for staff and clients.<br/>
                                - Worked in a small team collaborating on large scale projects.<br/>
                                - Liased with external contractors and service providers to improve IT systems and services.
                            </p>
                        </div>
                        <div className="bg-portfolio-bg rounded-md p-4 sm:p-6 border-l-4 border-portfolio-color2">
                            <h3 id="administration-assistant-experience" aria-labelledby="relevant-experience-section" className="text-xl text-portfolio-text mb-2">Administration Assistant</h3>
                            <p aria-labelledby="administration-assistant-experience" className="text-portfolio-color2 mb-2">South Coast Private Hospital | December 2021 - Feburary 2023</p>
                            <p aria-labelledby="administration-assistant-experience" className="text-portfolio-text">
                                <strong>Worked independently in busy psychology and reception departments providing administrative support.</strong><br/><br/>
                                - Performed a range of administrative tasks including data entry, patient scheduling, and patient communication.<br/>
                                - Conducted data analysis and mandatory reporting for the psychology department.<br/>
                                - Maintained and developed complex excel spreadsheets using VBA, macros and pivot tables for patient tracking and reporting.<br/>
                                - Maintained and updated patient records and files.<br/>
                                - Liaised with patients, staff and insurance providers to ensure smooth provision of care.<br/>
                                - Conducted patient intake and discharge processes.<br/>
                                - Conducted patient referral and follow-up.<br/>
                            </p>
                        </div>
                        <div className="bg-portfolio-bg rounded-md p-4 sm:p-6 border-l-4 border-portfolio-color2">
                            <h3 id="bachelor-of-computer-science-experience" aria-labelledby="relevant-experience-section" className="text-xl text-portfolio-text mb-2">Bachelor of Computer Science</h3>
                            <p aria-labelledby="bachelor-of-computer-science-experience" className="text-portfolio-color2 mb-2">University of Wollongong | March 2019 - July 2022</p>
                            <p aria-labelledby="bachelor-of-computer-science-experience" className="text-portfolio-text">
                                <strong>Completed a Bachelor of Computer Science with a specialisation in Cybersecurity at the University of Wollongong. Graduated with distinction.</strong><br/><br/>
                                - Completed a major group project for an organisation to design and develop a full stack psychosocial risk management web application for workplace mental health.<br/>
                                - Received high distinctions in problem solving, IT project management and major group project.<br/>
                                - Received distinctions in programming, web technology, system analysis, object oriented design, systems security, algorithms and data structures.<br/>
                                - Developed an interest in database design, cryptography, and software development.<br/>
                                - Completed electives in engineering mechanics, material science and sustainability.<br/>
                            </p>
                        </div>
                        <div className="bg-portfolio-bg rounded-md p-4 sm:p-6 border-l-4 border-portfolio-color2">
                            <h3 id="general-duties-team-leader-experience" aria-labelledby="relevant-experience-section" className="text-xl text-portfolio-text mb-2">General Duties/Team Leader</h3>
                            <p aria-labelledby="general-duties-team-leader-experience" className="text-portfolio-color2 mb-2">UOW Pulse Ltd. & Supa IGA plus Liquor Moruya | December 2015 - July 2022</p>
                            <p aria-labelledby="general-duties-team-leader-experience" className="text-portfolio-text">
                                <strong>Worked in a customer-facing role in a retail environment providing a range of general duties and small team leadership responsibilities.</strong><br/><br/>
                                - Completed a range of general duties including stock replenishment, customer service, and cleaning.<br/>
                                - Trained and supervised junior staff in opening, closing and general duties tasks.<br/>
                                - Managed the distribution of coworkers to assist with different departments as needed.<br/>
                                - Responded to incidents (spills, breakages, theft) quickly whilst assisting and serving customers.<br/>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}