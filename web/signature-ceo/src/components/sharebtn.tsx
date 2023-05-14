export const ShareButton = () => {
    const shareData = {
        title: 'Signature CEO',
        url: location.toString(),
    };

    const canShare = navigator.canShare(shareData);

    if (!canShare)
        return <div>Cant share cuz ur browser don't support this feature.</div>;

    return (
        <button
            className="btn"
            onClick={() => {
                navigator.share(shareData);
            }}
        >
            Share
        </button>
    );
};
