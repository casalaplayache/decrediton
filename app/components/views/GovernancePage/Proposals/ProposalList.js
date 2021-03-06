import { FormattedMessage as T, FormattedRelative } from "react-intl";
import { activeVoteProposals, preVoteProposals, votedProposals, proposals } from "connectors";
import { VotingProgress } from "indicators";
import { tsToDate } from "helpers";
import { PoliteiaLoading, NoProposals } from "indicators";

const ProposalListItem = ({ name, timestamp, token, voting, voteCounts, onClick }) => (
  <div className="proposal-list-item" onClick={() => onClick(token)}>
    <div className="info">
      <div className="proposal-name">{ name }</div>
      <div className="proposal-token">{ token }</div>
      <div className="proposal-timestamp">
        <T id="proposalItem.submittedAt" m="Submitted {reldate}" values={{
          reldate: <FormattedRelative  value={ tsToDate(timestamp) } /> }} />
      </div>
    </div>
    {voting ? <VotingProgress voteCounts={voteCounts} /> : null}
  </div>
);

const ProposalList = ({ proposals, loading, viewProposalDetails }) => (
  <Aux>
    { loading
      ? <div className="proposal-loading-page"><PoliteiaLoading center /></div>
      : proposals && proposals.length
        ? (
          <div className="proposal-list">
            {proposals.map(v => (
              <ProposalListItem key={v.token} {...v} onClick={viewProposalDetails} />
            ))}
          </div>
        )
        : <NoProposals />
    }
  </Aux>
);

export const ActiveVoteProposals = activeVoteProposals(proposals(ProposalList));
export const PreVoteProposals = preVoteProposals(proposals(ProposalList));
export const VotedProposals = votedProposals(proposals(ProposalList));
