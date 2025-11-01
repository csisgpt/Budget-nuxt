import type { Meta, StoryObj } from '@storybook/vue3';
import HeroSection from '~/components/marketing/Hero.vue';

const meta: Meta<typeof HeroSection> = {
  title: 'Marketing/HeroSection',
  component: HeroSection
};

export default meta;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  render: () => ({
    components: { HeroSection },
    template: '<HeroSection />'
  })
};
