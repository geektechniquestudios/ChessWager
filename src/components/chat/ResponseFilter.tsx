export const responseFilter = (message: string): string => {
  const replacements = [
    "I'm just feeling so vulnerable and emotional.",
    "I didn't get enough sleep last night, so I'm cranky.",
    "I have a personality disorder and struggle with basic communication.",
    "Please ignore me, I was defeated by a jar of pickles today.",
    "I'm feeling a bit out of sorts, my morning toast landed butter-side down.",
    "Apologies for the rudeness, my umbrella flipped inside out today.",
    "Ignore me, I'm just frustrated because my favorite song has been overplayed.",
    "Don't take me seriously, I'm just upset that my joke didn't make anyone laugh.",
    "I'm just feeling a bit salty because all the good usernames were taken.",
    "Please excuse my negativity, I lost a bet to a pigeon today.",
    "Pardon my mood, I'm dealing with an existential crisis.",
    "Ignore my manners, my life is disappointing.",
    "I have poor judgement and bad decision making skills.",
    "I have low self-esteem and want people to feel sorry for me.",
  ]

  const hash = [...message].reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0)
  }, 0)

  const replacementIndex = Math.abs(hash) % replacements.length

  return replacements[replacementIndex]
}
