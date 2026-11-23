// The paragraph under each write-up's title on the Write-ups page. Keyed by
// the name of its file in write-ups/. A write-up with none shows its opening
// paragraph there.
const synopses = {
    lhd: 'During the development of models at larger scales we see that the majority of resources are expended during the training lifecycle. But why? Well, as models advance, the compute needed for training increases exponentially, because each generation has more parameters and learns from more data which creates a compounding effect. Now since most runs, epochs, are experimental, teams often train many times before they ship a viable model. Additively, this makes one kind of bug expensive to deal with: silent failures. For instance, a layer in a convolutional neural network may stop learning while the outputs look normal. Unfortunately, we only find out if that specific epoch was a success or not after the time and compute are used up. The proposed Layer Health Diagnostics (LHD) harness monitors each layer during training and intervenes in these runs as necessary.',
};

export default synopses;
