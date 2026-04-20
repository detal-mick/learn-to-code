import React, { useState, useRef, useEffect } from 'react';

const SNBTQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const navRef = useRef(null);

  const correctAnswers = {
    0: 'e', 1: 'a', 2: 'd', 3: 'b', 4: 'c', 5: 'd',
    6: 'c', 7: 'b', 8: 'e', 9: 'a', 10: 'd', 11: 'e', 12: 'b', 13: 'c',
    14: 'a', 15: 'e', 16: 'a', 17: 'b', 18: 'e', 19: 'd'
  };

  const passages = {
    thread: {
      title: "Discussion Thread",
      content: `Maya: Can reading books improve your emotional intelligence?

Rico: "A reader lives a thousand lives before he dies." Individuals typically gravitate toward literature that mirrors their values and worldview. Several of my peers enjoy science fiction, and engaging with them has sparked my interest in the genre as well. Other acquaintances are deeply invested in literary fiction, and this inspires me to explore more profound themes.

Dara: In my view, literature can shape emotional awareness, particularly during formative years when cognitive development is most active. Research indicates that young readers frequently internalize the emotional perspectives presented in narratives. For instance, a study by Kidd (2013) demonstrated that readers of literary fiction show enhanced empathy recognition. Nevertheless, family dynamics and early socialization remain the cornerstone for fundamental traits like self-awareness and compassion, as supported by attachment theory research from Bowlby (1988).

Marco: Genuine intellectual connection is irreplaceable. Every individual manages their own commitments, priorities, and challenges, so expecting others to always be accessible or fulfill every intellectual need is impractical. Intellectual companionship should not rest on continuous demands, as such expectations frequently result in frustration.

Nina: "Like attracts like." If your circle engages with shallow entertainment, you are more inclined to consume similar content. If you prioritize intellectual growth, your companions will likely share enthusiasm for learning and possess ambitious personal goals. If you dedicate time to certain pursuits, the likelihood is that your closest associates invest similar effort. Therefore, select your intellectual companions carefully!

Brian: I believe whether literature affects you also depends on the principles you absorb from your upbringing and cultural background. If your family instills strong critical thinking skills, you will not be easily swayed toward superficial content. For example, young people raised with analytical habits are often less susceptible to misinformation, even when surrounded by peers who accept it. This demonstrates that a solid foundation from home can shield someone from negative influences.`
    },
    techcorp: {
      title: "TechCorp Flexible Schedule Policy",
      content: `TEXT 1

The TechCorp directive regarding the elimination of flexible schedules triggered widespread commentary. While considerable attention centers on whether flexible hours enhance productivity, let us assess the directive from a management perspective.

The initial striking element is that the directive was issued by "Robert," the operations director. In established corporations, determinations of this magnitude and sensitivity generally originate directly from senior leadership. A substantial procedural modification—particularly one that contradicts prevailing practice—typically necessitates transparent executive responsibility. From a governance standpoint, favorable initiatives may be assigned downward, but contentious organizational changes frequently require direct ownership from top management. In this situation, Jennifer Chen, as Chief Operating Officer, would logically be anticipated to deliver such a fundamental change personally.

Furthermore, when introducing a directive of this nature, situational awareness is paramount. The essential consideration from a management perspective must be: How will our highest contributors react? Elite-performing staff members constitute the principal driver of organizational advantage, and their commitment is vital to sustained success. The directive asserts that "efficiency and innovation are frequently compromised when employees set their own hours," suggesting apprehension about output quality. However, this characterization seems oriented toward rectifying substandard performance rather than safeguarding and energizing top achievers.

Internal deliberations may have concentrated on anxieties regarding underperforming flexible-schedule workers. Yet, instituting a comprehensive directive to address these anxieties risks impacting high-performing personnel as well. A universal restriction can inadvertently regard all staff members as equally inefficient, irrespective of individual contributions. If certain employees fail to satisfy standards, a more strategic response would involve individualized performance intervention rather than organizational constraints that encompass everyone. Directives designed to modify the conduct of a limited few can generate unintended repercussions for the broader workforce.

TEXT 2

In 2019, one operational directive ignited a widespread conversation about workplace flexibility. When Jennifer Chen, COO of TechCorp, terminated flexible scheduling arrangements, numerous observers labeled the determination regressive. Nevertheless, her directive can be justified as a calculated initiative to revitalize a faltering organization.

At that juncture, TechCorp was surrendering market position to rivals like InnovateSoft and DataDynamics. In the competitive technology sector, advancement frequently relies on immediate coordination. Spontaneous desk-side discussions, rapid ideation sessions, and direct collaborative troubleshooting can generate innovative solutions. By mandating employees to maintain standard hours, Chen sought to amplify these exchanges and accelerate organizational responsiveness.

Additionally, TechCorp was pursuing a significant transformation. During phases of organizational uncertainty, enterprises require enhanced cohesion and more effective information flow. Flexible scheduling, though accommodating, can occasionally produce deficiencies in oversight and participation—especially in organizations already confronting performance obstacles. A unified temporal structure can encourage openness, instantaneous input, and a heightened sense of shared accountability.

Chen's directive can also be interpreted as a cultural recalibration. By synchronizing employee schedules, she communicated the necessity for intensified dedication and collective purpose. Constructing a unified organizational identity frequently demands common experiences and direct cooperation, which are more challenging to establish through asynchronous work patterns.`
    },
    homeschool: {
      title: "Homeschooling as Alternative Education",
      content: `TEXT 1

The instructional approach in homeschooling differs substantially from conventional institutions. Lessons are frequently organized around family routines, enabling parents to customize education without compromising household responsibilities. Some families also utilize hybrid models, integrating structured curriculum with experiential learning activities. Parents often emphasize conceptual mastery rather than exclusively standardized testing, since many homeschooled children develop unique learning patterns. Consequently, the educational setting is often more individualized in pace and methodology compared to traditional classrooms.

In recent years, this educational pathway has drawn a more extensive and varied population. The increasing acknowledgment of its credentials for college admission through standardized assessments and for professional development has prompted more families to regard homeschooling as a credible and intentional option. Support networks and homeschool cooperatives are now serving a broader spectrum of learners, indicating a progressive transition toward greater recognition of accredited home-based education in various regions.

However, homeschooling is still frequently perceived less favorably than traditional schools. Some individuals presume that because it operates outside institutional frameworks, its pedagogical rigor must be inferior. Others construe the customized schedule as evidence of diminished structure or accountability. There is also an enduring assumption that families resort to homeschooling only after difficulties in conventional education—reinforcing the idea that it is merely an "alternative option" rather than a purposeful selection.

TEXT 2

Homeschooling represents a parent-directed education model that is legally recognized as equivalent to formal schooling in many jurisdictions. Despite its expanding adoption, homeschooling is still occasionally regarded as an inferior alternative. In reality, countless accomplished individuals have pursued their education through this pathway, demonstrating that it is equally legitimate as institutional schooling.

One illustration is Tim Tebow, former professional athlete and Heisman Trophy winner. Although he was educated at home throughout his childhood, he later excelled athletically and academically. He has consistently advocated for homeschooling, emphasizing that alternative education should not be stigmatized.

Another prominent figure is Emma Watson (pursued partial homeschooling during her acting career). After determining that traditional schooling conflicted with her professional obligations, she incorporated homeschool elements independently. With her education foundation, Emma demonstrated her capabilities by gaining admission to Brown University. Her academic journey continued successfully, where she balanced her entertainment career with rigorous university studies.

The same principle emerges in the experience of Simone Biles, Olympic gymnast. Despite her demanding athletic training schedule from an early age, she completed portions of her secondary education through homeschooling. Her experience underscores that homeschooling is not simply a fallback choice, but a flexible pathway that permits individuals to pursue education while developing specialized talents.`
    }
  };

  const questions = [
    {
      passage: 'thread',
      q: 'Which commenters suggest that family plays an important role in shaping a person\'s character?',
      options: {
        a: 'Rico and Dara',
        b: 'Dara and Marco',
        c: 'Marco and Brian',
        d: 'Nina and Dara',
        e: 'Brian and Dara'
      }
    },
    {
      passage: 'thread',
      q: 'Who shares a personal experience of being influenced by peers?',
      options: {
        a: 'Rico',
        b: 'Dara',
        c: 'Marco',
        d: 'Nina',
        e: 'Brian'
      }
    },
    {
      passage: 'thread',
      q: 'In Nina\'s argument, what does "Like attracts like" mean?',
      options: {
        a: 'Magnetic materials help scientists identify properties of similar substances.',
        b: 'Individuals cannot avoid becoming different from their companions over time.',
        c: 'Similar organisms prefer to gather in groups as it enhances their collective advantage.',
        d: 'People\'s behavior often reflects the norms shared within their close social circle.',
        e: 'Individuals tend to adjust their behaviors to maintain harmony within their peer group.'
      }
    },
    {
      passage: 'thread',
      q: 'Who posted the most reliable comment?',
      options: {
        a: 'Rico',
        b: 'Dara',
        c: 'Marco',
        d: 'Nina',
        e: 'Brian'
      }
    },
    {
      passage: 'thread',
      q: 'Who posted the least relevant answer to Maya\'s question?',
      options: {
        a: 'Rico',
        b: 'Dara',
        c: 'Marco',
        d: 'Nina',
        e: 'Brian'
      }
    },
    {
      passage: 'thread',
      q: 'Which statement has an advisory tone?',
      options: {
        a: 'Research indicates that young readers frequently internalize the emotional perspectives presented in narratives.',
        b: 'Genuine intellectual connection is irreplaceable.',
        c: 'If your circle engages with shallow entertainment, you are more inclined to consume similar content.',
        d: 'Therefore, select your intellectual companions carefully!',
        e: 'This demonstrates that a solid foundation from home can shield someone from negative influences.'
      }
    },
    {
      passage: 'techcorp',
      q: 'The writer\'s intention in writing Text 1 is to ….',
      options: {
        a: 'discuss the effects of stopping flexible schedules on workers',
        b: 'report the contents of TechCorp\'s directive about flexible schedules',
        c: 'criticize TechCorp\'s flexible schedule directive from a management point of view',
        d: 'explain why TechCorp\'s COO decided to permanently end flexible schedules',
        e: 'argue that TechCorp\'s COO made the correct decision about flexible schedules'
      }
    },
    {
      passage: 'techcorp',
      q: 'How are both texts related?',
      options: {
        a: 'Both texts describe the TechCorp directive and explain why flexible schedules can reduce productivity.',
        b: 'Both texts talk about the TechCorp directive, but offer different evaluations of its effectiveness.',
        c: 'Both texts suggest that TechCorp was struggling at the time the directive was issued.',
        d: 'Both texts analyze the leadership style of Jennifer Chen during her time at TechCorp.',
        e: 'Both texts evaluate how the directive influenced TechCorp\'s corporate culture.'
      }
    },
    {
      passage: 'techcorp',
      q: 'According to Text 1, what most likely motivated TechCorp to implement the flexible-schedule ban?',
      options: {
        a: 'A belief that all flexible-schedule employees were underperforming.',
        b: 'Dissatisfaction among employees with existing flexible schedule policies.',
        c: 'Evidence that high-performing employees were less productive with flexible hours.',
        d: 'The COO\'s intention to strengthen immediate coordination across teams.',
        e: 'Concerns that flexible schedules can negatively affect efficiency and innovation.'
      }
    },
    {
      passage: 'techcorp',
      q: 'What does the writer imply in the last paragraph of Text 1?',
      options: {
        a: 'Banning flexible schedules may not effectively address concerns about underperforming employees.',
        b: 'Most flexible-schedule employees are high performers who are unfairly targeted by the schedule ban.',
        c: 'A small number of underperformers typically cause widespread organizational problems.',
        d: 'Addressing underperformance requires eliminating flexible schedule options.',
        e: 'Employees perceive universal restrictions as a sign of distrust from management.'
      }
    },
    {
      passage: 'techcorp',
      q: 'The phrase "this situation" in the second paragraph of Text 1 refers to …',
      options: {
        a: 'the public debate about flexible schedules',
        b: 'the shift in company scheduling policy',
        c: 'the COO\'s leadership style',
        d: 'the TechCorp directive banning flexible schedules',
        e: 'the decline in employee productivity'
      }
    },
    {
      passage: 'techcorp',
      q: 'The sentence "In the competitive technology sector, advancement frequently relies on immediate coordination" in Text 2 can be restated as …',
      options: {
        a: 'In the rapidly changing technology industry, progress and innovation often depend on instant teamwork.',
        b: 'Coordination is required for advancement in the rapidly changing technology industry.',
        c: 'Immediate coordination is key in the tech sector to advance quickly.',
        d: 'In the fast-moving technology field, advancement usually depends on real-time coordination among companies.',
        e: 'Within the rapidly evolving technology field, breakthroughs often rely on real-time cooperation.'
      }
    },
    {
      passage: 'techcorp',
      q: 'Which of the following statements expresses the author\'s opinion from the texts?',
      options: {
        a: 'At that juncture, TechCorp was surrendering market position to rivals like InnovateSoft and DataDynamics.',
        b: 'The directive asserts that "efficiency and innovation are frequently compromised when employees set their own hours," suggesting apprehension about output quality.',
        c: 'When Jennifer Chen, COO of TechCorp, terminated flexible scheduling arrangements, numerous observers labeled the determination regressive.',
        d: 'The TechCorp directive regarding the elimination of flexible schedules triggered widespread commentary.',
        e: 'In 2019, one operational directive ignited a widespread conversation about workplace flexibility.'
      }
    },
    {
      passage: 'techcorp',
      q: 'Which of the following statements best synthesizes the ideas of both texts?',
      options: {
        a: 'Flexible schedule policies are ineffective in competitive industries and should be avoided during corporate crises.',
        b: 'COOs must personally announce all controversial policies to maintain organizational stability.',
        c: 'The flexible schedule ban aims to improve coordination but may harm top performers.',
        d: 'Effective leadership means avoiding controversial organizational reforms during periods of uncertainty.',
        e: 'Flexible schedule restrictions are necessary whenever advancement slows in competitive industries.'
      }
    },
    {
      passage: 'homeschool',
      q: 'What is the main idea of Text 1?',
      options: {
        a: 'Homeschooling offers a customized learning approach and is gaining broader recognition, yet social stigma against it persists.',
        b: 'Homeschooling is exclusively designed for students who have never attended traditional school.',
        c: 'Greater public recognition increases acceptance of homeschooling, yet institutional schools remain widely preferred.',
        d: 'Homeschooling is gaining broader recognition and acceptance as a credible and intentional educational pathway.',
        e: 'Although homeschooling continues to face social stigma, enrollment among specialized-interest families keeps increasing over time.'
      }
    },
    {
      passage: 'homeschool',
      q: 'According to Text 1, which of the following statements is incorrect about homeschooling?',
      options: {
        a: 'Not all students in homeschooling follow standardized testing approaches.',
        b: 'The instruction often includes learners from varied educational backgrounds.',
        c: 'Graduates may use the credentials to apply for higher education via standardized assessments.',
        d: 'Some people assume homeschooling has lower pedagogical rigor than traditional school.',
        e: 'The model is designed as an alternative option for students who failed conventional schools.'
      }
    },
    {
      passage: 'homeschool',
      q: 'Based on both texts, who would benefit the most from reading them?',
      options: {
        a: 'Alternative education seekers',
        b: 'Parents evaluating educational programs',
        c: 'Traditional school teachers',
        d: 'Traditional school students',
        e: 'Education policy makers'
      }
    },
    {
      passage: 'homeschool',
      q: 'Information about the flexibility of homeschooling can be found in …',
      options: {
        a: 'Text 1 Paragraph 1 and Text 2 Paragraph 1',
        b: 'Text 1 Paragraph 1 and Text 2 Paragraph 4',
        c: 'Text 1 Paragraph 2 and Text 2 Paragraph 3',
        d: 'Text 1 Paragraph 2 and Text 2 Paragraph 1',
        e: 'Text 1 Paragraph 3 and Text 2 Paragraph 4'
      }
    },
    {
      passage: 'homeschool',
      q: 'Based on the two texts, which of the following will most likely happen in the future?',
      options: {
        a: 'Inspirational figures like Tim Tebow will become ambassadors of homeschooling.',
        b: 'Traditional school graduates will struggle to compete with homeschool graduates at university.',
        c: 'The Department of Education will require middle school graduates to pursue homeschooling.',
        d: 'Homeschooling will become the nation\'s educational showcase in international forums.',
        e: 'Homeschooling will become more widely accepted and attract more participants.'
      }
    },
    {
      passage: 'homeschool',
      q: 'Based on both texts, which of the following recommendations is appropriate to be implemented?',
      options: {
        a: 'Businesses should prioritize hiring homeschool graduates.',
        b: 'Additional homeschool cooperative centers should be built in rural areas.',
        c: 'Parents in homeschooling should receive mandatory pedagogical training programs.',
        d: 'Public campaigns are needed to reduce the stigma surrounding homeschooling.',
        e: 'The government should provide homeschool options in traditional schools.'
      }
    }
  ];

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.keys(answers).forEach(qNum => {
      if (answers[qNum] === correctAnswers[qNum]) correct++;
    });
    return correct;
  };

  const scrollToQuestion = (index) => {
    if (navRef.current) {
      const button = navRef.current.children[index];
      if (button) {
        button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  useEffect(() => {
    scrollToQuestion(currentQuestion);
  }, [currentQuestion]);

  if (showScore) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">Great job finishing the SNBT practice test</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-yellow-500 rounded-xl p-8 mb-6">
            <div className="text-white text-5xl font-bold mb-2">{score}/20</div>
            <div className="text-white text-lg">Correct Answers</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {Math.round((score / 20) * 100)}%
            </div>
            <div className="text-gray-600 text-sm">Your Score</div>
          </div>

          <button
            onClick={() => {
              setShowScore(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Retry Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentPassage = passages[questions[currentQuestion].passage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
            SNBT Try Out
          </h1>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2" ref={navRef}>
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg font-semibold transition-all ${
                  currentQuestion === index
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg scale-110'
                    : answers[index]
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Passage */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
              {currentPassage.title}
            </h2>
            <div className="prose prose-sm max-w-none overflow-y-auto max-h-[600px] pr-2 text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentPassage.content}
            </div>
          </div>

          {/* Right: Question */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-400">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Question {currentQuestion + 1}/20
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
                {questions[currentQuestion].q}
              </h3>
            </div>

            <div className="space-y-3">
              {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion] === key
                      ? 'bg-gradient-to-r from-blue-500 to-yellow-500 text-white border-transparent shadow-md'
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      answers[currentQuestion] === key
                        ? 'bg-white text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {key.toUpperCase()}
                    </span>
                    <span className="flex-1 pt-1">{value}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t-2 border-gray-200">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Previous
              </button>
              
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SNBTQuiz;
