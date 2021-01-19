<template>
  <section class="gif_page">
    <div>
      <input ref="range" type="range" step="1" min="20" max="500" value="100" />
      <button ref="btn" type="button">Do it</button>
    </div>
    <div>
      <img ref="image" class="image-element" src="" alt="gif" />
    </div>
    <video ref="video" src="../assets/video.mp4"></video>
  </section>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import GIF from "gif.js";
  export default defineComponent({
    setup() {
      const image = ref<HTMLImageElement | null>(null);
      const video = ref<HTMLVideoElement | null>(null);
      const btn = ref<HTMLButtonElement | null>(null);
      const range = ref<HTMLInputElement | null>(null);

      onMounted(() => {
        const gif = new GIF({
          workers: 2,
          quality: 10,
          workerScript: "/scripts/gif.js/gif.worker.js",
          width: 640,
          height: 360,
        });
        let startTime: number = 0;
        let sampleInterval: number = 0;

        const sampleUpdate = () => {
          const sample = range.value || { value: "0" };
          sampleInterval = parseInt(sample.value);
          gif.abort();
        };

        video.value?.addEventListener("canplay", () => {
          sampleUpdate();
        });

        range.value?.addEventListener("change", sampleUpdate);

        btn.value?.addEventListener("click", () => {
          const videoElement = video.value;
          console.log(videoElement);
          if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
            gif.abort();
            gif.frames = [];
            videoElement.play();
          }
        });

        gif.on("start", () => {
          startTime = new Date().getTime();
        });

        gif.on("progress", (p: number) => {
          console.log(p);
        });

        gif.on("finished", (blob: Blob) => {
          const downloadImage = (fileUrl: string, name: string) => {
            let aLink = document.createElement("a");
            aLink.download = `${name}.gif`; // 文件名后缀需要和dataurl表示的相同，否则可能乱码
            aLink.href = fileUrl;
            aLink.click();
          };
          const imageElement = image.value;
          let url = URL.createObjectURL(blob);
          if (imageElement) {
            imageElement.src = url;
            imageElement.onload = () => {
              downloadImage(url, "生成图片");
              URL.revokeObjectURL(url);
            };
          }
          let delta = new Date().getTime() - startTime;
          console.log(delta);
        });

        let timer: number = 0;
        const capture = () => {
          gif.addFrame(video.value, { copy: true, delay: sampleInterval });
        };
        video.value?.addEventListener("play", () => {
          clearInterval(timer);
          timer = setInterval(capture, sampleInterval);
        });
        video.value?.addEventListener("ended", () => {
          clearInterval(timer);
          gif.render();
        });
      });

      return { image, video, btn, range };
    },
  });
</script>

<style lang="scss">
  @import "../styles/mixin";
  .gif_page {
    .image-element {
      @include wh(640px, 360px);
    }
  }
</style>
