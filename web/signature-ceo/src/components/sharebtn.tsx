export const ShareButton = () => {
    const shareData = {
        title: 'Signature CEO',
        url: location.toString(),
    };

    const canShare = navigator['canShare'] && navigator['canShare'](shareData);

    if (!canShare)
        return (
            <button
                className="btn"
                onClick={() => {
                    navigator.clipboard.writeText(shareData.url);
                }}
            >
                Copy link
            </button>
        );

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
