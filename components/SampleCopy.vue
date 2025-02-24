<script setup lang="ts"></script>
<template>
  <div class="flex flex-gap-base">
    <div class="body-copy">
      <h1>Universal Declaration of Human Rights</h1>
      <h2>Everyone has the right to life, liberty and security of person.</h2>
      <h3>
        All human beings are born free and equal in dignity and rights. They are
        endowed with reason and conscience and should act towards one another in
        a spirit of brotherhood.
      </h3>
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
        Nothing in this Declaration may be interpreted as implying for any
        State, group or person any right to engage in any activity or to perform
        any act aimed at the destruction of any of the rights and freedoms set
        forth herein.
      </p>
    </div>
    <div class="img"><div></div></div>
  </div>
</template>
<style lang="scss">
.body-copy {
  h1,
  h2,
  h3 {
    @include get-cols(4, width);
  }

  p {
    @include get-cols(3, width);
  }

  h1 {
    @include align-to-baseline(4, 3, 3);
  }
  h2 {
    @include align-to-baseline(3, 2, 2);
  }
  h3 {
    @include align-to-baseline(2, 2, 2);
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
