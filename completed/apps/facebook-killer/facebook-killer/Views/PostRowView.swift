import SwiftUI
import SwiftData

struct PostRowView: View {
    @Environment(\.modelContext) private var modelContext
    let post: Post
    let currentUser: User

    private var isLikedByCurrentUser: Bool {
        post.likes.contains { $0.user?.persistentModelID == currentUser.persistentModelID }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Author + timestamp
            HStack {
                if let avatarData = post.author?.avatarData, let uiImage = UIImage(data: avatarData) {
                    Image(uiImage: uiImage)
                        .resizable()
                        .scaledToFill()
                        .frame(width: 36, height: 36)
                        .clipShape(Circle())
                } else {
                    Image(systemName: "person.circle.fill")
                        .resizable()
                        .frame(width: 36, height: 36)
                        .foregroundStyle(.secondary)
                }
                VStack(alignment: .leading) {
                    Text(post.author?.name ?? "Unknown")
                        .font(.headline)
                        .accessibilityIdentifier("post_author_name")
                    Text(post.timestamp, style: .relative)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .accessibilityIdentifier("post_timestamp")
                }
                Spacer()
            }

            // Post text
            Text(post.text)
                .font(.body)
                .accessibilityIdentifier("post_text")

            // Optional photo
            if let photoData = post.photoData, let uiImage = UIImage(data: photoData) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFit()
                    .frame(maxHeight: 200)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }

            // Like button + count
            HStack {
                Button {
                    toggleLike()
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: isLikedByCurrentUser ? "heart.fill" : "heart")
                            .foregroundStyle(isLikedByCurrentUser ? .red : .secondary)
                        Text("\(post.likeCount)")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                }
                .buttonStyle(.plain)
                .accessibilityIdentifier("post_like_button")
                Spacer()
            }
        }
        .padding(.vertical, 4)
    }

    private func toggleLike() {
        if let existingLike = post.likes.first(where: { $0.user?.persistentModelID == currentUser.persistentModelID }) {
            modelContext.delete(existingLike)
        } else {
            let like = Like(user: currentUser, post: post)
            modelContext.insert(like)
        }
        try? modelContext.save()
    }
}
