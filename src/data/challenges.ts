import type { AgeGroupId, AgeSpecificGuidance, GuidanceSections, ParentingChallenge, RelatedVideo } from './types';

const allAges: AgeGroupId[] = ['6-12-months', '12-24-months', '2-3-years', '3-4-years'];

const ageIntro: Record<AgeGroupId, string> = {
  '6-12-months': 'At this age, babies depend on your steady help and may need many repeats before a routine feels familiar.',
  '12-24-months': 'At this age, toddlers want more control but still need simple steps, close support, and calm limits.',
  '2-3-years': 'At this age, children often have strong wants before they have the words and self-control to handle them smoothly.',
  '3-4-years': 'At this age, preschoolers can practice choices and short problem-solving, but they still need adult help when feelings rise.',
};

const video = (title: string): RelatedVideo => ({
  title,
  description: 'A related Baby to Big Kid video will be added here when the YouTube link is ready.',
  youtubeUrl: '',
});

const makeGuidance = (ageGroupId: AgeGroupId, sections: GuidanceSections, videoTitle: string): AgeSpecificGuidance => ({
  ageGroupId,
  sections: {
    why: [ageIntro[ageGroupId], ...sections.why],
    tryNow: sections.tryNow,
    avoid: sections.avoid,
    words: sections.words,
    pediatrician: sections.pediatrician,
  },
  relatedVideo: video(videoTitle),
});

const basePediatrician = [
  'Contact your pediatrician if you are worried about pain, illness, feeding, sleep, growth, or development.',
  'Seek urgent help right away if your child has trouble breathing, is hard to wake, has signs of dehydration, or you feel your child may not be safe.',
];

export const challenges: ParentingChallenge[] = [
  {
    id: 'wakes-when-put-down',
    title: 'My baby wakes up when I put them down',
    categoryId: 'sleep',
    summary: 'Gentle ideas for transfers, naps, and sleep spaces.',
    ageGroupIds: allAges,
    guidance: allAges.map((age) => makeGuidance(age, {
      why: ['Some children wake during a transfer because the movement, warmth, or pressure changes quickly.', 'They may also be between sleep cycles or need more time to settle before being placed down.'],
      tryNow: ['Pause until your child’s body feels heavy and relaxed before the transfer.', 'Lower your child slowly, feet first, then bottom, then shoulders and head.', 'Keep one steady hand on their chest or back for a moment before stepping away.', 'Use a simple sleep cue, such as a short phrase, dim room, and safe sleep space.'],
      avoid: ['Avoid placing loose blankets, pillows, or soft items in a baby’s sleep space.', 'Avoid rushing the transfer when your child is still moving, fussing, or searching for you.', 'Avoid treating one hard night as proof that nothing will help.'],
      words: ['“You are safe. It is sleep time.”', '“I am going to put you down gently now.”', '“I will check on you soon.”'],
      pediatrician: basePediatrician,
    }, 'Helping Your Child Settle for Sleep')),
  },
  {
    id: 'refuses-diaper-changes', title: 'My toddler refuses diaper changes', categoryId: 'care-routines', summary: 'Ways to make diaper changes calmer and more predictable.', ageGroupIds: allAges,
    guidance: allAges.map((age) => makeGuidance(age, {
      why: ['Diaper changes can feel boring, interrupt play, or make a child feel out of control.', 'Some children dislike lying down, being wiped, or stopping an activity with little warning.'],
      tryNow: ['Give a short warning: “One more block, then diaper.”', 'Offer two acceptable choices, such as standing or lying down when safe.', 'Keep supplies ready so the change is quick.', 'Use a small job: “Hold the clean diaper for me.”'],
      avoid: ['Avoid chasing if you can make the space safe and calmly reset.', 'Avoid long lectures during the change.', 'Avoid shaming your child for a dirty diaper or accidents.'],
      words: ['“Your body needs a clean diaper.”', '“Do you want to hold the wipes or the diaper?”', '“First diaper, then back to play.”'],
      pediatrician: basePediatrician,
    }, 'Making Diaper Changes Easier')),
  },
  {
    id: 'meltdowns-small-things', title: 'My child has meltdowns over small things', categoryId: 'big-feelings', summary: 'Calm steps for big feelings over everyday limits.', ageGroupIds: allAges,
    guidance: allAges.map((age) => makeGuidance(age, {
      why: ['A small problem can feel very big when a child is tired, hungry, overstimulated, or disappointed.', 'Some children need help naming feelings before they can move toward a solution.'],
      tryNow: ['Get close, lower your voice, and reduce extra talking.', 'Name what you see: “You wanted the blue cup.”', 'Hold the limit and offer one small next step.', 'After your child is calmer, practice a simple repair or redo.'],
      avoid: ['Avoid trying to reason through the whole problem during peak crying.', 'Avoid giving in to every unsafe or impossible request just to stop the noise.', 'Avoid teasing, threatening, or calling the feeling dramatic.'],
      words: ['“You are upset. I can help.”', '“The answer is still no. I will stay with you.”', '“When your body is ready, we can try again.”'],
      pediatrician: basePediatrician,
    }, 'Helping With Big Feelings')),
  },
  {
    id: 'afraid-of-strangers', title: 'My baby is suddenly afraid of strangers', categoryId: 'social-development', summary: 'Support for new worries around unfamiliar people.', ageGroupIds: allAges,
    guidance: allAges.map((age) => makeGuidance(age, {
      why: ['Some children become more aware of familiar and unfamiliar faces as they grow.', 'New people, loud greetings, or being passed quickly from person to person can feel overwhelming.'],
      tryNow: ['Let your child watch from your arms or beside you before interacting.', 'Ask others to give space, use a soft voice, and avoid grabbing or rushing touch.', 'Model a warm greeting while allowing your child to join slowly.', 'Bring a familiar comfort item when you expect new people.'],
      avoid: ['Avoid forcing hugs, kisses, or being held by someone else.', 'Avoid labeling your child as rude or unfriendly.', 'Avoid disappearing suddenly to “teach” independence.'],
      words: ['“You can stay close while you warm up.”', '“We wave first. Hugs are your choice.”', '“This is Grandma. I am right here.”'],
      pediatrician: basePediatrician,
    }, 'Helping With Stranger Worry')),
  },
  {
    id: 'cries-when-i-leave', title: 'My child cries when I leave the room', categoryId: 'separation', summary: 'Reassuring routines for short separations and returns.', ageGroupIds: allAges,
    guidance: allAges.map((age) => makeGuidance(age, {
      why: ['Your child may be learning that you can leave and come back, but that idea can still feel hard in the moment.', 'Tiredness, new places, and changes in routine can make separation harder.'],
      tryNow: ['Use a short, predictable goodbye every time.', 'Practice tiny separations when your child is calm, then return as promised.', 'Offer a safe activity or familiar object before you step away.', 'Come back with a calm greeting instead of making the return feel like a rescue.'],
      avoid: ['Avoid sneaking away when your child is not looking.', 'Avoid long goodbyes that restart the upset.', 'Avoid promising you will never leave the room.'],
      words: ['“I am going to the kitchen. I will come back.”', '“You are sad I left. I came back like I said.”', '“One hug, then goodbye.”'],
      pediatrician: basePediatrician,
    }, 'Easing Separation Tears')),
  },
  {
    id: 'throws-food', title: 'My toddler throws food from the high chair', categoryId: 'feeding', summary: 'Simple limits for food throwing without turning meals into a battle.', ageGroupIds: allAges,
    guidance: allAges.map((age) => makeGuidance(age, {
      why: ['Food throwing may be exploration, a request for attention, a sign your child is done, or a way to test cause and effect.', 'Meals can also be harder when a child is tired, full, or not comfortable in the seat.'],
      tryNow: ['Serve small amounts at a time so there is less to throw.', 'Say the limit once and show where food goes.', 'Offer a “done” signal, such as handing you the plate or saying “all done.”', 'If throwing continues, calmly end the meal and try again later at the next planned eating time.'],
      avoid: ['Avoid big reactions that can make throwing more exciting.', 'Avoid forcing more bites after your child shows they are done.', 'Avoid using food as punishment or reward.'],
      words: ['“Food stays on the tray.”', '“If you are done, give me the plate.”', '“You threw food, so lunch is all done for now.”'],
      pediatrician: basePediatrician,
    }, 'What to Do When Food Gets Thrown')),
  },
];
