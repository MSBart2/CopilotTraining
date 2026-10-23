# Exercise 2.1: Swap the Show

## 🔨 Exercise

### Exercise 2.1: Swap the Show — "Align the Foundation Before the Sprint Starts"

**Lead:** Rafael ⭐ | **Support:** Sarah 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 9:00 AM. Sprint planning starts in 15 minutes. Rafael opens the FanHub repo and sees what he already suspected: the seed data is still Breaking Bad. Characters, episodes, locations — all placeholder content from the workshop scaffold. The team's chosen show is sitting in a doc somewhere and in the `docs/[show]-universe.md` they created in Module 1. The product they're building features on top of? Still Walter White.

Rafael doesn't care which files need updating. He cares that the team doesn't spend the next three sprints building features on the wrong foundation.

*"The architecture is fine. The data is wrong. Before anyone opens a feature branch, the repo needs to reflect what we're actually shipping."*

He's not going to hand-edit seed files. He's going to ask Copilot to enumerate what needs to change, generate the replacement content, and execute the swap — before standup.

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Team builds features on Breaking Bad placeholder data. Every exercise, every example, every test uses the wrong show. Inconsistencies compound across modules. | Repo reflects the team's chosen show from day one. Every subsequent exercise, plan, and prompt runs against real data — the product they're actually building. |
| **Data alignment:** Manual, deferred ("we'll swap it later") | **Data alignment:** Done in Agent mode before sprint planning |
| **Confidence in examples:** Low — everything references the wrong show | **Confidence in examples:** High — exercises are grounded in their own content |

**Time saved:** 10 min now prevents hours of confusion across five modules of exercises.

#### 🎯 Your Goal

Use Copilot in Agent mode to replace the Breaking Bad seed data with content for your chosen show. By the end of this exercise, the FanHub site loads characters, episodes, and locations from your show — not Breaking Bad.

#### 📋 Steps

1. **Open Agent mode**

   Open Copilot Chat (`Ctrl+Alt+I` / `Cmd+Alt+I` on Mac) and switch to **Agent** mode. Agent mode can read files, generate new content, and write changes — which is exactly what a data swap requires.

2. **Ask Copilot to audit the seed data**

   Paste the following prompt:

   ```
   @workspace Audit the FanHub seed data and list every file that contains
   Breaking Bad-specific content (character names, episode titles, locations,
   show-specific terminology). Don't make any changes yet — just list the files
   and summarize what each one contains.
   ```

   Review the list. This is your swap inventory.

3. **Ask Copilot to generate replacement content**

   Once you've seen what needs to change, prompt:

   ```
   Using docs/[show]-universe.md as the source of truth, generate replacement
   seed data for [Your Show] to replace the Breaking Bad content in the files
   you just listed. Match the existing data structure exactly — same field names,
   same format, same number of entries where possible. Apply the changes.
   ```

   Replace `[Your Show]` and `[show]` with your actual show name and slug.

4. **Verify the swap**

   Once Copilot completes the changes, open the FanHub app (or check the data files directly) and confirm:
   - At least 3 characters from your show appear
   - At least 1 episode or season entry is present
   - No "Walter White" or "Jesse Pinkman" remain in the seed data

#### ✅ Success Criteria

- [ ] Agent mode used to audit and swap seed data (not manual find/replace)
- [ ] Characters, episodes, and/or locations reflect your chosen show
- [ ] Breaking Bad character names no longer appear in seed data files
- [ ] `docs/[show]-universe.md` referenced as the content source

#### 💭 Reflection

> **Rafael:** "The architecture is fine. The data is wrong. This is a 15-minute alignment — not a feature."
>
> Sarah, reviewing the PR: "We'll make this the first thing we do next time."
>
> Rafael: "It is. I'm already on the next OKR."

#### 🔗 Connection to the Module

This exercise is the only one in Module 2 that isn't about planning a feature. It's about **establishing the foundation** that makes every plan meaningful. When the data matches your product, every subsequent plan, every example output, and every test you run throughout the workshop is grounded in something real.

Everything from Exercise 2.2 forward builds on top of what you just swapped in.
