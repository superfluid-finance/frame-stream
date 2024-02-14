export const followingQuery = (id) => `
query isFollowing {
  Wallet(input: {identity: "fc_fid:${id}", blockchain: ethereum}) {
    socialFollowers(
      input: {filter: {identity: {_in: ["fc_fid:289702"]}}}
    ) {
      Follower {
        dappName
        dappSlug
        followingProfileId
        followerProfileId
        followingAddress {
          addresses
          socials {
            dappName
            profileName
          }
          domains {
            name
          }
        }
      }
    }
  }
}
`

export const walletQuery = (id) => `
  query GetAddressesOfFarcasters {
    Socials(
      input: {
        filter: { identity: { _in: ["fc_fid:${id}"] } }
        blockchain: ethereum
      }
    ) {
      Social {
        userAssociatedAddresses
      }
    }
  }
`