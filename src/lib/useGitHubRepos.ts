"use client";

import { useEffect, useState } from "react";
import { fetchPublicRepos, type GitHubRepo } from "./github";

type State =
  | { status: "loading"; repos: GitHubRepo[]; error: null }
  | { status: "ready"; repos: GitHubRepo[]; error: null }
  | { status: "error"; repos: GitHubRepo[]; error: string };

export function useGitHubRepos(): State {
  const [state, setState] = useState<State>({ status: "loading", repos: [], error: null });

  useEffect(() => {
    let alive = true;
    fetchPublicRepos()
      .then((repos) => alive && setState({ status: "ready", repos, error: null }))
      .catch((e: unknown) =>
        alive && setState({ status: "error", repos: [], error: e instanceof Error ? e.message : "Failed to load repositories" }),
      );
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
