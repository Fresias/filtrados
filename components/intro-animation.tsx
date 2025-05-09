import { IntroAnimationClient } from "./intro-animation-client"

export function IntroAnimation() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none" id="intro-animation-container">
      <IntroAnimationClient />
    </div>
  );
}
