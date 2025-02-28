<script setup lang="ts"></script>
<template>
  <div class="flex flex-gap-base">
    <div class="body-copy">
      <div>
        <h1>Universal Declaration of Human Rights</h1>
        <h5>
          The Universal Declaration of Human Rights (UDHR) is a milestone
          document in the history of human rights. Drafted by representatives
          with different legal and cultural backgrounds from all regions of the
          world, the Declaration was proclaimed by the United Nations General
          Assembly in Paris on 10 December 1948 (General Assembly resolution 217
          A) as a common standard of achievements for all peoples and all
          nations. It sets out, for the first time, fundamental human rights to
          be universally protected and it has been translated into over 500
          languages. The UDHR is widely recognized as having inspired, and paved
          the way for, the adoption of more than seventy human rights treaties,
          applied today on a permanent basis at global and regional levels (all
          containing references to it in their preambles).
        </h5>
      </div>

      <div>
        <h4>Preamble</h4>
        <p>
          Whereas recognition of the inherent dignity and of the equal and
          inalienable rights of all members of the human family is the
          foundation of freedom, justice and peace in the world, Whereas
          disregard and contempt for human rights have resulted in barbarous
          acts which have outraged the conscience of mankind, and the advent of
          a world in which human beings shall enjoy freedom of speech and belief
          and freedom from fear and want has been proclaimed as the highest
          aspiration of the common people, Whereas it is essential, if man is
          not to be compelled to have recourse, as a last resort, to rebellion
          against tyranny and oppression, that human rights should be protected
          by the rule of law, Whereas it is essential to promote the development
          of friendly relations between nations, Whereas the peoples of the
          United Nations have in the Charter reaffirmed their faith in
          fundamental human rights, in the dignity and worth of the human person
          and in the equal rights of men and women and have determined to
          promote social progress and better standards of life in larger
          freedom, Whereas Member States have pledged themselves to achieve, in
          co-operation with the United Nations, the promotion of universal
          respect for and observance of human rights and fundamental freedoms,
          Whereas a common understanding of these rights and freedoms is of the
          greatest importance for the full realization of this pledge, Now,
          therefore, The General Assembly, Proclaims this Universal Declaration
          of Human Rights as a common standard of achievement for all peoples
          and all nations, to the end that every individual and every organ of
          society, keeping this Declaration constantly in mind, shall strive by
          teaching and education to promote respect for these rights and
          freedoms and by progressive measures, national and international, to
          secure their universal and effective recognition and observance, both
          among the peoples of Member States themselves and among the peoples of
          territories under their jurisdiction.
        </p>
      </div>

      <div class="articles flex flex-col">
        <h3>Articles</h3>
        <div>
          <h4>Article 1</h4>
          <p>
            All human beings are born free and equal in dignity and rights. They
            are endowed with reason and conscience and should act towards one
            another in a spirit of brotherhood.
          </p>
        </div>
        <div>
          <h4>Article 2</h4>
          <p>
            Everyone is entitled to all the rights and freedoms set forth in
            this Declaration, without distinction of any kind, such as race,
            colour, sex, language, religion, political or other opinion,
            national or social origin, property, birth or other status.
            Furthermore, no distinction shall be made on the basis of the
            political, jurisdictional or international status of the country or
            territory to which a person belongs, whether it be independent,
            trust, non-self-governing or under any other limitation of
            sovereignty.
          </p>
        </div>
        <div>
          <h4>Article 3</h4>
          <p>Everyone has the right to life, liberty and security of person.</p>
        </div>
        <div>
          <h4>Article 4</h4>
          <p>
            No one shall be held in slavery or servitude; slavery and the slave
            trade shall be prohibited in all their forms.
          </p>
        </div>
        <div>
          <h4>Article 5</h4>
          <p>
            No one shall be subjected to torture or to cruel, inhuman or
            degrading treatment or punishment.
          </p>
        </div>
        <div>
          <h4>Article 6</h4>
          <p>
            Everyone has the right to recognition everywhere as a person before
            the law.
          </p>
        </div>
      </div>

      <!-- <dl class="flex-gap-base">
        <div>
          <dt>Established</dt>
          <dd>1948</dd>
        </div>
        <div>
          <dt>Translations</dt>
          <dd>562</dd>
        </div>
        <div>
          <dt>Member states</dt>
          <dd>193</dd>
        </div>
      </dl>
      <h3>Everyone has the right to life, liberty and security of person.</h3>
      <p>
        Everyone is entitled to all the rights and freedoms set forth in this
        Declaration, without distinction of any kind, such as race, colour, sex,
        language, religion, political or other opinion, national or social
        origin, property, birth or other status. Furthermore, no distinction
        shall be made on the basis of the political, jurisdictional or
        international status of the country or territory to which a person
        belongs, whether it be independent, trust, non-self-governing or under
        any other limitation of sovereignty.
      </p>
      <p>
        All human beings are born free and equal in dignity and rights. They are
        endowed with reason and conscience and should act towards one another in
        a spirit of brotherhood.
      </p>
      <p>
        Nothing in this Declaration may be interpreted as implying for any
        State, group or person any right to engage in any activity or to perform
        any act aimed at the destruction of any of the rights and freedoms set
        forth herein.
      </p> -->
    </div>
    <!-- <div class="img"><div></div></div> -->
  </div>
</template>
<style lang="scss">
.body-copy {
  margin-bottom: #{use-line-height(1)};
  max-width: 100%;

  h1 {
    margin: #{use-line-height(1)} 0;
  }

  h2 {
    margin-top: #{use-line-height(2)};
  }

  h3 {
    margin-top: #{use-line-height(3)};
  }

  h4 {
    margin-top: #{use-line-height(4)};
    max-width: #{get-max-width(4)};
  }

  h5 {
    max-width: #{get-max-width(5)};
  }

  h1,
  h2,
  h3,
  p {
    max-width: 100%;
  }

  p {
    font-size: var(--text-p);
    margin: #{use-line-height('p') 0};
    max-width: var(--text-col-width);
  }

  dl {
    display: flex;
    margin-bottom: calc(var(--base-line-height) * 3);
    max-width: 100%;

    div {
      @include get-cols(1, width);
    }

    dt {
      transform: translateY(calc(var(--base-line-height) * 0.5));

      @include align-to-baseline(1, 1, 1);
    }

    dd {
      font-size: #{get-font-size(3)};
      font-weight: 900;
      @include align-to-baseline(3, 2, 0);
    }

    &:last-of-type {
      width: fit-content;
    }

    @include use-mq('max-xs') {
      div {
        width: auto;
      }
    }
  }
}

.img {
  flex: 1;
  margin-top: calc(var(--base-line-height) * 3);

  div {
    background: black;
    height: 400px;
    width: 100%;
  }
}
</style>
