import SwiftUI

struct PostCellView: View {
    let post: Post

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                if let author = post.author {
                    NavigationLink {
                        UserProfileView(user: author)
                    } label: {
                        HStack(spacing: 4) {
                            Text(author.name)
                                .fontWeight(.semibold)
                                .foregroundStyle(.primary)
                            Text("@\(author.handle)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .accessibilityIdentifier("post_author_link")
                }

                Spacer()

                Text(post.timestamp, style: .relative)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .accessibilityIdentifier("post_timestamp")
            }

            Text(post.text)
                .font(.body)
                .accessibilityIdentifier("post_text")
        }
        .padding(.vertical, 4)
        .accessibilityIdentifier("post_cell")
    }
}
