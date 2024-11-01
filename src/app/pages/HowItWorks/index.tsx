import React, { ReactElement } from 'react';
import CardWrapper from 'components/CardWrapper';

const HowItWorks = (): ReactElement => {
  return (
    <CardWrapper cardType="centered" className="w-1/2">
      <article className="-mt-10 flex flex-col gap-20 text-center">
        <section id="step-one">
          <h4>Set Your Luxury</h4>
          <p className="mt-4">
            At PARISN, we offer an exclusive, time-sensitive collection that is designed to both
            entice and excite. Each product you see is a select luxury, their presence fleeting as
            they make way for the new. What&apos;s more enticing is the price. It starts high,
            reflecting the premium quality and exclusivity of the item, but here&apos;s where the
            excitement begins. As time goes on, each item&apos;s price elegantly descends,
            spiralling towards zero. It's a shopping spectacle you won&apos;t see anywhere else,
            turning the conventional retail model on its head.
          </p>
        </section>
        <section id="step-two">
          <h4>Set Your Terms</h4>
          <p className="mt-4">
            As a shopper, you&apos;re in control at PARISN. Every product comes with an opportunity
            for you to define your ideal price point. This means you exercise the power to customise
            your own sophisticated shopping narrative. You decide what a product is worth to you.
            With your price set, you&apos;re ready to move on to the final step. But remember, this
            is where patience and strategy become key players in your shopping experience.
          </p>
        </section>
        <section id="step-three">
          <h4>Claim or Await</h4>
          <p className="mt-4">
            Now comes the most thrilling part of your PARISN experience. Do you secure your chosen
            luxury at its prevailing price or do you anticipate an even more attractive deal as
            prices continue to dip? It&apos;s a fine balance to strike. Claiming early ensures you
            don&apos;t leave empty-handed, but holding off could see you snagging an unbeatable
            deal. The risk? Waiting could lead to your desired item being snapped up by others.
            It&apos;s a high-stakes game of patience and timing, and the reward is a luxury item at
            an exceptional price. With every second ticking by, your shopping experience at PARISN
            becomes an adventure in itself.
          </p>
        </section>
      </article>
    </CardWrapper>
  );
};

export default HowItWorks;
